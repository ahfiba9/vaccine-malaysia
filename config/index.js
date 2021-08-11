const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost:3000' : 'https://yourwebsite.com'
export const citfBaseUrl = 'https://github.com/CITF-Malaysia/citf-public/raw/main'
export const kkmBaseUrl =  'https://github.com/MoH-Malaysia/covid19-public/raw/main/epidemic'
export const startVaccineYear = 2021

export const versionNumber = '1.0.2'