import * as faker from 'faker';

faker.seed(10);
console.log(faker);
let items = []; 
let dataLength = 10;

for(let i = 0; i <= dataLength; i++){

    items.push({
        'id'             : i*10,
        // 'id': faker.random.uuid(),
        'firstName'      : faker.name.firstName(),
        'company'        : faker.company.companyName(),
        'email'          : faker.internet.email(),
        'phone'          : faker.phone.phoneNumber(),
        'taxNumber': faker.random.number({min: 0, max: 30}),
        'invoiceAddress' : {
            'address': faker.address.streetAddress(),
            'city': faker.address.city(),
            'zip': faker.address.zipCode()
        },
        // meta
        'createdOn': faker.date.past(),
        'updatedOn': faker.date.past(), 
    })

}

export class DemoFDb
{
    public static items = items;
}
