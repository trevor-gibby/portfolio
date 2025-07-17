
import { withSessionRoute } from '@/backend/session'
import { sendEmail } from '@/backend/mailer'

export default withSessionRoute(
  async (req, res) => {
    
    if(req.method === 'POST') {
      const { honeyPot, name, email, message } = req.body

      if(!name || !email || !message) {
        res.status(422).json({ error: 'Invalid input' })
        return
      }

      // TODO Filter out spam
      if(honeyPot) {
        console.log('Honey pot detected')
        res.status(200).json({ message: 'Form submitted successfully!' })
        return
      }
      if(email === 'test@email.com') {
        console.log('Test email detected')
        res.status(200).json({ message: 'Thank you for your test submission!' })
        return
      }

      // SMTP to send email to my email address
      const subject = `New message from ${name} (${email})`
      const html = `
        <p>You have a new message from ${name} (${email})</p>
        <p><strong>Message:</strong> ${message}</p>
      `;

      const result = await sendEmail(subject, html)
      if(!result) {
        res.status(500).json({ error: 'Error sending email' })
        return;
      }

      // Save session with messageSent = true
      req.session.messageSent = true
      await req.session.save()
      res.status(200).json({ message: 'Thank you for your submission! I will get back to you as soon as possible' })
    }
    else {
      res.status(405).json({ error: 'Method not allowed' })
    }

  }
)
