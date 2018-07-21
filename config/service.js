module.exports = {
    recaptcha: {
        site_key: process.env.RECAPTCHA_SITE_KEY,
        secret_key: process.env.RECAPTCHA_SECRET_KEY,
        options: { hl: 'fa' }
    }
}