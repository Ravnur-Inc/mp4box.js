// aligned(8) class ContentProvenanceBox extends FullBox(`'uuid'`, extended_type = 0xD8 0xFE 0xC3 0xD6 0x1B 0x0E 0x48 0x3C 0x92 0x97 0xE8 0x28 0x87 0x7E 0xC4 0x81, version = 0, 0) {
//     string box_purpose;
//     bit(8) data[];
// }

BoxParser.createUUIDBox("d8fec3d61b0e483c92975828877ec481", true, false, function (stream) {
    this.box_purpose = stream.readCString();

    var data_size = this.size - this.hdr_size - (this.box_purpose.length + 1);

    if (this.box_purpose === "manifest") {
        this.c2pa_merkle_offset = stream.readUint8Array(8);
        data_size -= 8;
    }

    // The data represents binary encoded JUMBF manifest for "manifest" box
    // or raw CBOR bytes for "merkle" box
    this.data = stream.readUint8Array(data_size);
})