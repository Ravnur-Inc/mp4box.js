// aligned(8) class ContentProvenanceBox extends FullBox(`'c2pa'`, version = 0, 0) {
//     string box_purpose;
//     bit(8) data[];
// }

BoxParser.createFullBoxCtor("c2pa", function (stream) {
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