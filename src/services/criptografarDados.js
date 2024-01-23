const crypto = require('crypto')
require('dotenv').config();

class CriptografarService{
    constructor(){

    }
    async criptografarDadosCartao(numero, cvv){
        const chaveDeCriptografia = process.env.FULLCARD;
        const iv = crypto.randomBytes(16);
  
  
        const keyLength = 32; 
        const paddedKey = Buffer.alloc(keyLength, chaveDeCriptografia, 'utf-8');
  
  
  
        const cipherNumero = crypto.createCipheriv('aes-256-gcm', paddedKey, iv);
        let criptografadoNumero = cipherNumero.update(numero, 'utf-8', 'hex');
        criptografadoNumero += cipherNumero.final('hex');
        const tagNumero = cipherNumero.getAuthTag();
  
        const cipherCvv = crypto.createCipheriv('aes-256-gcm', paddedKey, iv);
        let criptografadoCvv = cipherCvv.update(cvv, 'utf-8', 'hex');
        criptografadoCvv += cipherCvv.final('hex');
        const tagCvv = cipherCvv.getAuthTag();

        return {criptografadoNumero, tagNumero, criptografadoCvv, tagCvv, iv};
    }
}

module.exports = CriptografarService;