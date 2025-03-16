-- person
{
  "fullName": "John Doe", 
  "email": "johndoe@example.com", 
  "hashedPassword": "",           
  "role": "user",               
  "phoneNumber": "",              
  "isActive": true                
}

--categorie_piece
{
  "id" : 1
  "category": "Pneu"
}

-- mecanin
{
  "fullName": "John Doe",           
  "email": "johndoe@example.com",   
  "isActive": true,                
  "skills": [                      
    {
      "categoryId": "1",  
    }
  ]
  "salary" : "1000"
}


--marque
{
  "brand": "Tesla",  
  "models": [
    {
      "modelName": "Model S",
      "year": 2022
    },
  ]
}


-- cars
{
  "userId": "ObjectId('user_id')",
  "brandId": "ObjectId('marque_id')",
  "brand": "Tesla",
  "modelID" : 
  "model": "Model S",
  "year": 2022,
  "registrationNumber": "AAT",
  "chassisNumber": "OP",
  "mileage": 4000
}


--piece 
{
  "brandId": "ObjectId('marque_id')",
  "brand": "Tesla",
  "model": "Model S",
  "categoryId": 1,
  "partName": "Pièce A",
  "price": 100.00
}

-- gestion de stock
{
  "partId": "ObjectId('part_id')",
  "quantityIn": 10,
  "quantityOut": 10,
  "stockMovements": [
    {
      "type": "Achat",
      "isOut": true,
      "quantity": 0,
      "movementDate": "ISODate('2024-03-10T09:00:00Z')"
    }
  ]
}


--rendez vous
{
  "date": "ISODate('2024-03-10')",
  "appointments": [
    {
      "userId": "ObjectId('user_id')",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "",
      "time": "08:30"
    }
  ]
}

-- transaction
{
  "transactionType": "Achat",
  "price": 5000,
  "date": "ISODate('2024-03-10T09:00:00Z')"
}

-- repair
{
  "userId": "ObjectId('user_id')",
  "carId": "ObjectId('car_id')",
  "customerName": "John Doe",
  "customerEmail": "johndoe@example.com",
  "repairDescription": "",
  "repairStartDate": "ISODate('2024-03-10T09:00:00Z')",
  "repairEndDate": "ISODate('2024-03-10T09:00:00Z')",
  "status": "completed",
  "needsQuotation": false,
  "repairCost": 5000,
  "estimatedCost": null,
  "laborCost": null,
  "categories": [
    {
      "categoryId": "ObjectId('category_id')"
    }
  ],
  "mechanics": [
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "",
      "competencies": [
        {
          "categoryId": 1
        }
      ]
    }
  ],
  "images": [
    {
      "imageUrl": "lins"
    }
  ],
  "repairDetails": [
    {
      "partId": "ObjectId('part_id')",
      "partName": "pneu",
      "price": 1000
    }
  ],
  "quotationDetails": [
    {
      "partId": "ObjectId('part_id')",
      "partName": "pneu",
      "price": 1000
    }
  ]
}

--map
{
  "location": "Analakely",
  "latitude": 0.0,
  "longitude": 0.0
}


-- salaire
{
  "_id": "ObjectId('salaire_id')",
  "date": "ISODate('2024-03-10T09:00:00Z')",
  "mechanicId": "ObjectId('mecanicien_id')",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "",
  "salaryAmount": 5000
}
