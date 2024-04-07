function formatUang(angka){
    var number_string = angka.toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
}

function ellipsisText(value, length){
    let textElipsis = value;
    if (value.length > length) {
        textElipsis = value.substring(0, length) + ' ...';
    }
    return textElipsis;
}

module.exports = {
    formatUang,
    ellipsisText
}