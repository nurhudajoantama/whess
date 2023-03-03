## WHESS

Simple Self-Hosted API Webhook for WhatsApp

it's a simple self-hosted API webhook for WhatsApp, you can use it to send messages to your WhatsApp number from any application that can make HTTP requests.

### How to use

1. Clone this repository

   ```bash
   git clone https://github.com/nurhudajoantama/whess
   cd whess
   ```

2. Install dependencies

   ```bash
   yarn
   # or
   npm install
   ```

3. Create a `.env` file and fill it with your credentials

   ```bash
   cp .env.example .env
   ```

   or actually you can use `token:generate` to generate `USER_TOKEN`

   ```base
   yarn token:generate
   # or
   npm run token:generate
   ```

4. Run the server

   ```bash
   yarn start
   # or
   npm run start
   ```

---

Generated by [Nurhuda Joantama](https://github.com/nurhudajoantama)