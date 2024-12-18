import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {

  const post_data = await readBody(event);
  console.log('coming from confirm frontend', post_data);
  
  
  const post_obj = {
    from: post_data.data.email,
    name: post_data.data.name,
    to: 'olli.vyae@gail.com',
    subject: post_data.data.subject,
    html: `<p>${post_data.data.message}</p>`
  }

  console.log('post_obj', post_obj);

  resend.emails.send(post_obj)
  
});