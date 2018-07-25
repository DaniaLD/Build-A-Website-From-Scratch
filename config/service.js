module.exports = {
    recaptcha: {
        site_key: process.env.RECAPTCHA_SITE_KEY,
        secret_key: process.env.RECAPTCHA_SECRET_KEY,
        options: { hl: 'fa' }
    },

    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        callback_url: process.env.GOOGLE_CALLBACK_URL
    }
}