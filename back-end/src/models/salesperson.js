import { z } from 'zod'
import { cpf } from 'cpf-cnpj-validator'

const maxBirthDate = new Date() 
maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18)  

const minBirthDate = new Date()
minBirthDate.setFullYear(maxBirthDate.getFullYear() - 120)

const minHireDate = new Date('January 1, 2020 00:00:01')   
minHireDate.getTime(minHireDate)

const maxHireDate = new Date()
maxHireDate.getTime(maxHireDate)

const Customer = z.object({
  user_id:
    z.number(),

  birth_date: 
    z.coerce.date()
    .min(minBirthDate, { message: 'O vendedor deve ter menos de 120 anos'})
    .max(maxBirthDate, { message: 'O vendedor deve ser maior de 18 anos' })
    .nullable(),
  
  ident_document: 
    z.string()
    .trim()
    .length(14, { message: 'O CPF está incompleto'})
    .refine(val => cpf.isValid(val), { message: 'CPF inválido' }),
  
  salary: 
    z.number()
    .min(1500, { message: 'O salário do vendedor não pode ser menor que R$1.500' })
    .max(20000, { message: 'O salário do vendedor não pode ser maior que R$20.000' }),
  
  phone: 
    z.string()
    .transform(v => v.replace('_', '')) 
    .refine(v => v.length == 15, { message: 'O número do telefone/celular está incompleto' }),
  
    date_of_hire: 
    z.coerce.date()
    .min(minHireDate, { message: 'O vendedor não pode ter sido contratado antes de 2020'})
    .max(maxHireDate, { message: 'O vendedor não pode ser contratado no futuro' })
    
})

export default Customer
