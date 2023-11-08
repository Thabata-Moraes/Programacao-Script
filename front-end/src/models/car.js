import { z } from 'zod'

const maxYearManufacture = new Date()   // Hoje
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear())  

const minYearManufacture = new Date()
minYearManufacture.setFullYear(maxYearManufacture.getFullYear() - 83)

const maxSellingDate = new Date()

const Car = z.object({
  brand: 
    z.string()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caracter' })
    .max(25, { message: 'A marca deve ter, no mínimo, 25 caracteres' }),
  
  model: 
    z.string()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caracter' })
    .max(25, { message: 'O modelo deve ter, no mínimo, 25 caracteres' }),

  color: 
    z.string()
    .min(4, { message: 'A cor deve ter, no mínimo, 4 caracteres' })
    .max(20, { message: 'A cor deve ter, no mínimo, 20 caracteres' }),

  year_manufacture:
    z.coerce.date()
    .min(minYearManufacture, { message: 'Data de ano de fabricação está muito no passado'})
    .max(maxYearManufacture, { message: 'A data não pode ser maior que o ano atual' })
    .nullable(),

  imported:
    z.boolean(),

  plates:
    z.string()
    .transform(v => v.replace('_', '')) 
    .refine(v => v.length == 8, { message: 'Algum dígito da placa está incompleto' }),

  selling_date:
    z.coerce.date()
    .max(maxSellingDate, { message: 'A data não pode ser maior que o dia atual' })
    .nullable(),

  selling_price:
    z.number()
    .max(2000, {message: 'O valor não pode ser abaixo de 2000'})
    .nullable(),

  customer_id:
    z.number()
    .min(0, {message: 'O valor precisa ser positivo'})
    .nullable()
})

export default Car

// selling_date e "selling_price"