export default defineEventHandler(async (event) => {

  const post_data = await readBody(event);
  console.log('coming from confirm frontend', post_data);
  
  const post_obj = {
    service_id: process.env.email_js_service_id,
    template_id: process.env.email_js_template_id,
    user_id: process.env.email_js_user_id,
    template_params: {
      'user_name': post_data.name,
      'user_email': post_data.email,
      'message': post_data.message
    }
  }

  $fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post_obj),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to send email');
    }
  }).catch((error) => {
    console.error('Error:', error);
    return new Response('Error sending email', { status: 500 });
  })

});