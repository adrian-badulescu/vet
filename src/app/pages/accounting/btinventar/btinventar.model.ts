export class BtInventarCls {
    id: string;
    selection1: string;
    selection2: string;
    onePositionBt: number; // o pozitie pe BT
    morePosBt: number; // mai multe poz pe BT
    reimbursementAdm98: number; // restituire la gest 98 (bit)
    docNo: number;



    obs: string; // explicatie
    // Predator
    brand: string; // marca
    goneToo: number; // inclusiv plecati (bit)
    nameField: string; // sub buton cautare angajat
    adm1: number; // Gestiune
    admInputField: string; // sub buton cautare gestiune
    // Primitor
    _brand: string; // marca
    _nameField: string; // sub buton cautare angajat
    _adm: number; // gestiune
    retainWage: number; // retinere salariu (bit)
    _admInputField: string; // sub biton cautare gestiune

    searchObj: number; // cautare dupa nr Obj. Inv.

    docType: string;
    inventoryNo: number; // nr inventar
    docDate: Date;
    bt: number; // nr BT
    noDocOut: number; // nr doc iesire
    // _noDocOut: number; // continuare noDocOut
    name: string; // denumire
    matCode: number; // cod material
    qty: number;
    chargeCenter: string; // centru de cost
    counter: number; // contor pozitii
    _bt: number;

}