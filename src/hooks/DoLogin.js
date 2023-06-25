const DoLogin = async values => {
  const fetchLogIn = async values => {
    const res = await globalThis
      .fetch('http://192.168.100.173:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error HTTP: ' + response);
        }
        let token = response.headers
          .get('Authorization')
          .replace('Bearer ', '');
        localStorage.setItem('token', token);
        console.log('Se obtine token: ' + token);
        return 'ok';
      })
      .catch(error => {
        console.error(error);
        return 'ko';
      });
    return res;
  };
  return fetchLogIn(values);
};

export default DoLogin;
