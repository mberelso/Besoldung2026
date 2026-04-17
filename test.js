import {
  grundgehalt,
  kidMonthsInYear,
  efzMonthly,
  familienzuschlag,
  firstTwoKids
} from './src/logic/calculator.js';

let pass = 0, fail = 0;
function t(label, got, expected, tol){
  if(tol === undefined) tol = 0.01;
  const ok = Math.abs(got - expected) < tol;
  console.log((ok ? 'OK  ' : 'FAIL'), label, '=', got, '(erwartet', expected, ')');
  if(ok) pass++; else fail++;
}

t('A9 S3 04/2025', grundgehalt('A','A9',3,'apr25'), 3728.11);
t('A13 S8 05/2026', grundgehalt('A','A13',8,'may26'), 7164.14);
t('A3 S1 05/2026 (79->S2)', grundgehalt('A','A3',1,'may26'), 3107.26);
t('R2 S1 05/2026 (79->S2)', grundgehalt('R','R2',1,'may26'), 7600.00);

const kid2023 = {idx:1, birth:'2023-06', end:null, edu:false, pflege:false};
t('Kind2023-06 in 2021', kidMonthsInYear(kid2023, 2021, 12), 0);
t('Kind2023-06 in 2022', kidMonthsInYear(kid2023, 2022, 12), 0);
t('Kind2023-06 in 2023', kidMonthsInYear(kid2023, 2023, 12), 7);
t('Kind2023-06 in 2024', kidMonthsInYear(kid2023, 2024, 12), 12);

const kid2007 = {idx:1, birth:'2007-04', end:null, edu:false, pflege:false};
t('Kind2007-04 in 2024', kidMonthsInYear(kid2007, 2024, 12), 12);
t('Kind2007-04 in 2025', kidMonthsInYear(kid2007, 2025, 12), 3);
const kid2007_edu = Object.assign({}, kid2007, {edu:true});
t('Kind2007-04 edu 2025', kidMonthsInYear(kid2007_edu, 2025, 12), 12);

t('Kind2023-06 2026pre max4', kidMonthsInYear(kid2023, 2026, 4), 4);

t('EFZ verh 2K',     efzMonthly('married', 2, false), 1519);
t('EFZ verh 2K PKV', efzMonthly('married', 2, true),  1519+287);
t('EFZ allein 2K',   efzMonthly('singleparent', 2, false), 484);
t('EFZ allein 1K',   efzMonthly('singleparent', 1, false), 0);
t('EFZ verh 0K',     efzMonthly('married', 0, false), 607);
t('EFZ verh 0K PKV', efzMonthly('married', 0, true),  607+285);

const kid1 = {idx:1, birth:'2018-01'};
const kid2 = {idx:2, birth:'2020-06'};
t('FZ verh 0K 04/25', familienzuschlag('apr25','married',[],'A9'), 176.42);
t('FZ verh 2K 04/25', familienzuschlag('apr25','married',[kid1,kid2],'A9'), 327.19+150.77);
t('FZ 2K 05/26',      familienzuschlag('may26','married',[kid1,kid2],'A9'), 530);
t('FZ 3K 05/26',      familienzuschlag('may26','married',[kid1,kid2,{idx:3,birth:'2023-01'}],'A9'), 530+708);

const three = [{idx:3,birth:'2023-06'}, {idx:1,birth:'2018-01'}, {idx:2,birth:'2020-06'}];
const sorted = firstTwoKids(three);
t('firstTwoKids[0].idx', sorted[0].idx, 1);
t('firstTwoKids[1].idx', sorted[1].idx, 2);

console.log('\n--- Szenario 79d ---');
const K1 = {idx:1, birth:'2018-03', edu:false, pflege:false};
const K2 = {idx:2, birth:'2022-09', edu:false, pflege:false};
t('Kind1 FZ 2021', kidMonthsInYear(K1,2021,12), 12);
t('Kind2 FZ 2022', kidMonthsInYear(K2,2022,12), 4);
t('Kind2 FZ 2021', kidMonthsInYear(K2,2021,12), 0);
const betrag79d = 41*(12+0) + 9*(12+4) + 52*(12+12);
console.log('Summe 79d:', betrag79d.toFixed(2));

console.log('\n--- Szenario 41 Nr.1 Elterngeld ---');
const diff = 1519 - 1300;
t('Differenz pro Monat', diff, 219);
t('79a Summe 12 Monate', (4+8)*diff, 2628);

console.log('\n' + pass + ' OK, ' + fail + ' FAIL');
