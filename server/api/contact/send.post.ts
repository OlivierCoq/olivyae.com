export default defineEventHandler(async (event) => {

  const post_data = await readBody(event);
  console.log('coming from confirm frontend', post_data);
  
  const post_obj = {
    service_id: process.env.email_js_service_id,
    template_id: process.env.email_js_template_id,
    user_id: process.env.email_js_user_id,
    template_params: {
      'from_name': post_data.name,
      'from_email': post_data.email,
      'message': post_data.message,
      'to_name': 'Nathan'
    }
  }


});