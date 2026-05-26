import {
  A_APR25, A_MAY26, B_APR25, B_MAY26, 
  W_APR25, W_MAY26, R_APR25, R_MAY26,
  FZ_APR25, FZ_MAY26, EFZ_MAY26,
  NACHZAHLUNG, MAX_DURATION, GROUPS
} from './tables.js';
import { calculateTaxesMonthly } from './taxCalculator.js';

export { GROUPS, MAX_DURATION };


export const fmt = v => v==null? '–' : v.toLocaleString('de-DE',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2});

export function grundgehalt(order,group,level,period){
  let tbl;
  if(order==='A')      tbl = period==='apr25'? A_APR25 : A_MAY26;
  else if(order==='B') tbl = period==='apr25'? B_APR25 : B_MAY26;
  else if(order==='W') tbl = period==='apr25'? W_APR25 : W_MAY26;
  else                 tbl = period==='apr25'? R_APR25 : R_MAY26;
  if(order==='B') return tbl[group];
  const row = tbl[group]; if(!row) return null;
  let idx = level-1;
  if(period==='may26' && (order==='A' || (order==='R' && group==='R2')) && idx===0) idx=1;
  const v = row[idx];
  return (v===undefined||v===null)? null : v;
}

export function erhBetragA(group,career,period){
  if(period!=='apr25') return 0;
  if((group==='A5'||group==='A6') && career==='mittlerer_A5A6') return 25.90;
  if((group==='A9'||group==='A10') && career==='gehobener_A9A10') return 11.30;
  return 0;
}

export function kidMonthsInYear(kid, year, maxMonths){
  if(!kid.birth) return 0;
  const [by,bm] = kid.birth.split('-').map(Number);
  const ageLimit = kid.edu? 25:18;
  let endY = by+ageLimit, endM = bm-1; if(endM===0){endM=12; endY--;}
  if(kid.end){ const [ey,em] = kid.end.split('-').map(Number); if(ey<endY || (ey===endY && em<endM)){endY=ey;endM=em;} }
  const curEndM = maxMonths;
  let months = 0;
  for(let m=1; m<=curEndM; m++){
    const monthsFromBirth = (year-by)*12 + (m-bm);
    if(monthsFromBirth<0) continue;
    const monthsToEnd = (endY-year)*12 + (endM-m);
    if(monthsToEnd<0) continue;
    months++;
  }
  return months;
}

export function familienzuschlag(period,married,kids,group){
  const k = kids.length;
  if(period==='apr25'){
    let sum=0;
    if(married==='married' || (married==='singleparent' && k>0)) sum += FZ_APR25.stufe1_verheiratet;
    if(k>=1){
      sum += (FZ_APR25.stufe2_ersterkind - FZ_APR25.stufe1_verheiratet);
      if(k>=2) sum += FZ_APR25.zweitKind;
      if(k>2)  sum += (k-2)*FZ_APR25.weitereKinder;
    }
    if(['A3','A4','A5'].includes(group) && k>=1) sum += 5.37;
    if(k>=2){
      if(group==='A3') sum += (k-1)*26.84;
      else if(group==='A4') sum += (k-1)*21.47;
      else if(group==='A5') sum += (k-1)*16.10;
    }
    return sum;
  } else {
    let sum=0;
    if(k>=1) sum += FZ_MAY26.ersterkind;
    if(k>=2) sum += FZ_MAY26.zweitKind;
    if(k>2)  sum += (k-2)*FZ_MAY26.weitereKinder;
    return sum;
  }
}

export function efzMonthly(married,kidsCount,pkv){
  const k = Math.min(2, kidsCount);
  if(married==='married'){
    const base = k===0? EFZ_MAY26.verh_0 : k===1? EFZ_MAY26.verh_1 : EFZ_MAY26.verh_2;
    return base + (pkv? EFZ_MAY26.pkv_plus[k] : 0);
  }
  if(married==='singleparent' && kidsCount>=2) return EFZ_MAY26.allein_2;
  return 0;
}

export function firstTwoKids(kids){ 
  return [...kids].sort((a,b)=>{
    if(!a.birth) return 1; if(!b.birth) return -1;
    return a.birth.localeCompare(b.birth);
  }).slice(0,2); 
}

/**
 * Calculates all results (monthly wage + backward payments) based on state inputs
 * @param {Object} d - State object containing all parameters
 * @param {Array} kids - Array of children objects
 * @returns {Object} Full calculation results
 */
export function calculateAll(d, kids) {
  const firstTwo = firstTwoKids(kids);

  function buildPeriod(period){
    const gg  = grundgehalt(d.order,d.group,d.level,period) || 0;
    const erh = (d.order==='A') ? erhBetragA(d.group,d.career,period) : 0;
    const fz  = familienzuschlag(period,d.married,kids,d.group);
    const efz = period==='may26'&&d.extFamilyCurrent ? efzMonthly(d.married, kids.length, d.pkv) : 0;
    const brutto = (gg+erh+fz+efz) * d.part;
    return {gg,erh,fz,efz,brutto};
  }
  const apr25 = buildPeriod('apr25');
  const may26 = buildPeriod('may26');

  // Steuerberechnung
  const taxClass = d.taxClass || '1';
  const kistRate = parseFloat(d.kistRate) || 0;
  const pkvMonthly = parseFloat(d.pkvMonthly) || 0;

  apr25.taxes = calculateTaxesMonthly(apr25.brutto, taxClass, kistRate, kids.length, pkvMonthly);
  apr25.netto = apr25.taxes.netto;
  apr25.verfuegbar = apr25.netto - pkvMonthly;

  may26.taxes = calculateTaxesMonthly(may26.brutto, taxClass, kistRate, kids.length, pkvMonthly);
  may26.netto = may26.taxes.netto;
  may26.verfuegbar = may26.netto - pkvMonthly;

  // Nachzahlungen
  const n_79b = (d.m[2021]>0) ? NACHZAHLUNG.einmal2021 : 0;
  let n_79c = 0;
  if(d.order==='A' && d.group==='A16') n_79c = NACHZAHLUNG.einmal2025.A16 * d.m[2025];
  if(d.order==='W' && d.group==='W1') n_79c = NACHZAHLUNG.einmal2025.W1  * d.m[2025];
  if(d.order==='R' && d.group==='R2') n_79c = NACHZAHLUNG.einmal2025.R2  * d.m[2025];
  n_79c *= d.part;

  let n_79d = 0;
  const details79d = [];
  [2021,2022,2025].forEach(y=>{
    const maxM = d.m[y];
    firstTwo.forEach(k=>{
      const km = Math.min(kidMonthsInYear(k, y, maxM), maxM);
      const rate = NACHZAHLUNG.kinder['y'+y];
      const betrag = rate * km * d.part;
      n_79d += betrag;
      if(km>0) details79d.push(y+', Kind '+k.idx+': '+km+'·'+fmt(rate)+' = '+fmt(betrag));
    });
  });

  let n_79a = 0;
  const rows79a = [];
  const yearKeys = ['2021','2022','2023','2024','2025','2026pre'];
  
  yearKeys.forEach(y=>{
    const incomes = d.incomes[y] || { months: 0, erwerb: 0, elterngeld: 0, sonst: 0, kind: 0 };
    const capMonths = Math.min(incomes.months, d.m[y]);

    let applicable = d.case41!=='none' && capMonths>0;
    let note='';
    let effMonths = capMonths;
    if(d.case41==='n1'){
      const refKids = kids.filter(k => (d.refChildrenN1||[]).includes(k.idx) && k.birth);
      if(refKids.length===0){ applicable=false; note='Nr. 1: mind. ein Bezugskind mit Geburtsdatum wählen'; }
      else {
        const yNum = y==='2026pre'? 2026 : parseInt(y);
        const maxMo = y==='2026pre'? 4:12;
        let below1=0;
        for(let m=1;m<=maxMo;m++){
          const eligible = refKids.some(kid => {
            const [by,bm] = kid.birth.split('-').map(Number);
            const monthsFromBirth = (yNum-by)*12 + (m-bm);
            return monthsFromBirth>=0 && monthsFromBirth<12;
          });
          if(eligible) below1++;
        }
        if(capMonths>below1){ note='begrenzt auf '+below1+' M. (Kind < 1 J.)'; }
        effMonths = Math.min(capMonths, below1);
        applicable = effMonths>0;
      }
    }
    if(d.case41==='a' && kids.length<2){ applicable=false; note='§ 41a setzt 2+ Kinder voraus'; }

    const jahreseink = incomes.erwerb + incomes.elterngeld + incomes.sonst + incomes.kind;
    const monatseink = effMonths>0 ? jahreseink/effMonths : 0;
    const monatsbetrag = applicable ? efzMonthly(d.case41==='a'?'singleparent':'married', kids.length, d.pkv) : 0;
    const diff = Math.max(0, monatsbetrag - monatseink);
    const betrag = applicable ? (diff * effMonths * d.part) : 0;
    
    n_79a += betrag;
    if(applicable && betrag>0)
        rows79a.push({ year: y, text: effMonths+' M. × ('+fmt(monatsbetrag)+' − '+fmt(monatseink)+'/Mon.) = '+fmt(betrag) });
  });

  const monate_3p = Math.max(0, d.m[2025]-3) + d.m['2026pre'];
  const diff3 = (apr25.brutto - apr25.brutto/1.03) * monate_3p;
  const hasKidge3 = kids.length>=3;
  const n_79e_hint = hasKidge3? '—: per RVO (nicht automatisch)' : 'nicht einschlägig (< 3 Kinder)';
  const total = n_79a + n_79b + n_79c + n_79d + diff3;

  return {
    apr25,
    may26,
    n_79b,
    n_79c,
    n_79d,
    n_79a,
    details79d,
    rows79a,
    diff3,
    total,
    n_79e_hint,
    monate_3p
  };
}
