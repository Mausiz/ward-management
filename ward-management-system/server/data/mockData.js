const { v4: uuidv4 } = require('uuid');

const wards = [
  { id: 'ward-a', name: 'Ward A', type: 'General', totalBeds: 20, floor: 1, headNurse: 'Sarah Mitchell' },
  { id: 'ward-b', name: 'Ward B', type: 'Cardiology', totalBeds: 15, floor: 2, headNurse: 'James Okafor' },
  { id: 'ward-c', name: 'Ward C', type: 'Oncology', totalBeds: 12, floor: 2, headNurse: 'Priya Sharma' },
  { id: 'ward-d', name: 'Ward D', type: 'ICU', totalBeds: 10, floor: 3, headNurse: 'Daniel Brooks' },
  { id: 'ward-e', name: 'Ward E', type: 'Paediatrics', totalBeds: 18, floor: 1, headNurse: 'Emma Walsh' },
  { id: 'ward-f', name: 'Ward F', type: 'Orthopaedics', totalBeds: 16, floor: 3, headNurse: 'Carlos Ruiz' },
];

const patients = [
  { id: uuidv4(), name: 'Margaret Thompson', age: 72, gender: 'Female', wardId: 'ward-a', bed: 'A-3', condition: 'Pneumonia', status: 'stable', admittedDate: '2026-02-10', doctor: 'Dr. Patel', bloodType: 'A+', contact: '+44 7700 900123' },
  { id: uuidv4(), name: 'Robert Harrington', age: 58, gender: 'Male', wardId: 'ward-b', bed: 'B-1', condition: 'Myocardial Infarction', status: 'critical', admittedDate: '2026-02-15', doctor: 'Dr. Chen', bloodType: 'O-', contact: '+44 7700 900456' },
  { id: uuidv4(), name: 'Alice Fontaine', age: 44, gender: 'Female', wardId: 'ward-c', bed: 'C-5', condition: 'Breast Cancer - Chemo', status: 'stable', admittedDate: '2026-02-08', doctor: 'Dr. Nguyen', bloodType: 'B+', contact: '+44 7700 900789' },
  { id: uuidv4(), name: 'David Osei', age: 34, gender: 'Male', wardId: 'ward-d', bed: 'D-2', condition: 'Traumatic Brain Injury', status: 'critical', admittedDate: '2026-02-16', doctor: 'Dr. Singh', bloodType: 'AB+', contact: '+44 7700 900321' },
  { id: uuidv4(), name: 'Lena Kowalski', age: 29, gender: 'Female', wardId: 'ward-a', bed: 'A-7', condition: 'Appendicitis (Post-Op)', status: 'recovering', admittedDate: '2026-02-14', doctor: 'Dr. Patel', bloodType: 'O+', contact: '+44 7700 900654' },
  { id: uuidv4(), name: 'Thomas Nguyen', age: 65, gender: 'Male', wardId: 'ward-f', bed: 'F-4', condition: 'Hip Replacement', status: 'recovering', admittedDate: '2026-02-12', doctor: 'Dr. Ruiz', bloodType: 'A-', contact: '+44 7700 900987' },
  { id: uuidv4(), name: 'Sophie Laurent', age: 7, gender: 'Female', wardId: 'ward-e', bed: 'E-2', condition: 'Severe Asthma', status: 'stable', admittedDate: '2026-02-16', doctor: 'Dr. Walsh', bloodType: 'B-', contact: '+44 7700 900111' },
  { id: uuidv4(), name: 'Ahmed Karim', age: 51, gender: 'Male', wardId: 'ward-b', bed: 'B-7', condition: 'Arrhythmia', status: 'stable', admittedDate: '2026-02-13', doctor: 'Dr. Chen', bloodType: 'O+', contact: '+44 7700 900222' },
  { id: uuidv4(), name: 'Isabelle Martin', age: 38, gender: 'Female', wardId: 'ward-a', bed: 'A-11', condition: 'Diabetes Complication', status: 'stable', admittedDate: '2026-02-11', doctor: 'Dr. Patel', bloodType: 'A+', contact: '+44 7700 900333' },
  { id: uuidv4(), name: 'Marcus Webb', age: 47, gender: 'Male', wardId: 'ward-d', bed: 'D-5', condition: 'Respiratory Failure', status: 'critical', admittedDate: '2026-02-17', doctor: 'Dr. Singh', bloodType: 'AB-', contact: '+44 7700 900444' },
  { id: uuidv4(), name: 'Yuki Tanaka', age: 23, gender: 'Female', wardId: 'ward-a', bed: 'A-14', condition: 'Appendicitis (Pre-Op)', status: 'stable', admittedDate: '2026-02-17', doctor: 'Dr. Patel', bloodType: 'O-', contact: '+44 7700 900555' },
  { id: uuidv4(), name: 'George Adeyemi', age: 80, gender: 'Male', wardId: 'ward-c', bed: 'C-9', condition: 'Prostate Cancer', status: 'palliative', admittedDate: '2026-02-01', doctor: 'Dr. Nguyen', bloodType: 'B+', contact: '+44 7700 900666' },
];

const staff = [
  { id: uuidv4(), name: 'Dr. Arjun Patel', role: 'Consultant', specialty: 'General Medicine', wardId: 'ward-a', shift: 'Day', status: 'on-duty', experience: '14 years', contact: 'ext. 2401' },
  { id: uuidv4(), name: 'Dr. Li Chen', role: 'Consultant', specialty: 'Cardiology', wardId: 'ward-b', shift: 'Day', status: 'on-duty', experience: '11 years', contact: 'ext. 2402' },
  { id: uuidv4(), name: 'Dr. Mai Nguyen', role: 'Consultant', specialty: 'Oncology', wardId: 'ward-c', shift: 'Day', status: 'on-duty', experience: '9 years', contact: 'ext. 2403' },
  { id: uuidv4(), name: 'Dr. Rajan Singh', role: 'Consultant', specialty: 'ICU / Critical Care', wardId: 'ward-d', shift: 'Day', status: 'on-duty', experience: '16 years', contact: 'ext. 2404' },
  { id: uuidv4(), name: 'Dr. Emma Walsh', role: 'Consultant', specialty: 'Paediatrics', wardId: 'ward-e', shift: 'Day', status: 'on-duty', experience: '8 years', contact: 'ext. 2405' },
  { id: uuidv4(), name: 'Dr. Carlos Ruiz', role: 'Consultant', specialty: 'Orthopaedics', wardId: 'ward-f', shift: 'Day', status: 'on-duty', experience: '12 years', contact: 'ext. 2406' },
  { id: uuidv4(), name: 'Sarah Mitchell', role: 'Head Nurse', specialty: 'General', wardId: 'ward-a', shift: 'Day', status: 'on-duty', experience: '10 years', contact: 'ext. 3101' },
  { id: uuidv4(), name: 'James Okafor', role: 'Head Nurse', specialty: 'Cardiology', wardId: 'ward-b', shift: 'Day', status: 'on-duty', experience: '8 years', contact: 'ext. 3102' },
  { id: uuidv4(), name: 'Priya Sharma', role: 'Head Nurse', specialty: 'Oncology', wardId: 'ward-c', shift: 'Night', status: 'off-duty', experience: '7 years', contact: 'ext. 3103' },
  { id: uuidv4(), name: 'Daniel Brooks', role: 'Head Nurse', specialty: 'ICU', wardId: 'ward-d', shift: 'Day', status: 'on-duty', experience: '12 years', contact: 'ext. 3104' },
  { id: uuidv4(), name: 'Nina Kowalczyk', role: 'Nurse', specialty: 'General', wardId: 'ward-a', shift: 'Day', status: 'on-duty', experience: '4 years', contact: 'ext. 3110' },
  { id: uuidv4(), name: 'Tom Bradley', role: 'Nurse', specialty: 'Cardiology', wardId: 'ward-b', shift: 'Night', status: 'off-duty', experience: '3 years', contact: 'ext. 3111' },
];

const activity = [
  { id: uuidv4(), type: 'admission', message: 'Marcus Webb admitted to Ward D - Bed D-5', time: '08:42', date: '2026-02-17', wardId: 'ward-d' },
  { id: uuidv4(), type: 'discharge', message: 'Patient Elena Rossi discharged from Ward A', time: '08:15', date: '2026-02-17', wardId: 'ward-a' },
  { id: uuidv4(), type: 'alert', message: 'Critical status update: Robert Harrington — Ward B', time: '07:55', date: '2026-02-17', wardId: 'ward-b' },
  { id: uuidv4(), type: 'admission', message: 'Yuki Tanaka admitted to Ward A - Bed A-14', time: '07:30', date: '2026-02-17', wardId: 'ward-a' },
  { id: uuidv4(), type: 'update', message: 'Sophie Laurent status updated to stable — Ward E', time: '06:50', date: '2026-02-17', wardId: 'ward-e' },
  { id: uuidv4(), type: 'discharge', message: 'Patient Hassan Ali discharged from Ward F', time: '06:20', date: '2026-02-17', wardId: 'ward-f' },
];

module.exports = { wards, patients, staff, activity };
