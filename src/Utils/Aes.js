import CryptoJS from 'crypto-js'

export const Encrypt = text => {
	const encrypted = CryptoJS.AES.encrypt(
		text,
		process.env.REACT_APP_SECRET_KEY
	).toString()

	return encrypted
}

export const Decrypt = cipher => {
	const bytes = CryptoJS.AES.decrypt(cipher, process.env.REACT_APP_SECRET_KEY)
	const decrypted = bytes.toString(CryptoJS.enc.Utf8)

	return decrypted
}
