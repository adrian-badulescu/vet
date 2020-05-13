
export class EwoTable {
    id;
    entitytypeid;
    name;
}
export class EwoField {
    id;
    entitytypeid;
    tablename;
    name;
}
export class EwoColumn {
    id;
    entitytypeid;
    tablename;
    field;
    header;
}

export class EwoProperty {
    id;
    entitytypeid
    tablename;
    control;
    model;
    width;
    label;
}