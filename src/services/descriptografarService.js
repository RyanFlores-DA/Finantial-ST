const crypto = require('crypto')

class DescriptografarService{
    constructor(){

    }
    async descriptografarDado(iv, criptografado, tag, chave) {
        return new Promise((resolve, reject) => {
            const chaveDeCriptografia = chave;
            const keyLength = 32;
            const paddedKey = Buffer.alloc(keyLength, chaveDeCriptografia, 'utf-8');
            const decipher = crypto.createDecipheriv('aes-256-gcm', paddedKey, Buffer.from(iv, 'hex'));

            decipher.setAuthTag(Buffer.from(tag, 'hex'));

            let descriptografado = decipher.update(criptografado, 'hex', 'utf-8');

            descriptografado += decipher.final('utf-8');

            resolve(descriptografado);
        });
    }
}
module.exports = DescriptografarService;