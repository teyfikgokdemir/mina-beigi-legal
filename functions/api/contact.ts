export const onRequestPost = async (context) => {
  const request = context.request;
  
  try {
    const formData = await request.formData();
    
    // Honeypot check
    if (formData.get('b_name')) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), { status: 400 });
    }
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (!name || !phone || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }
    
    console.log(`New lead: ${name} / ${phone}`);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}\n