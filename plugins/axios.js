export default function({ $axios, redirect }) {
  $axios.defaults.baseURL = 'https://example_restapi';

  console.log($axios);

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect('/400');
    }
  });
}
