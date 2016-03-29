import Meldio from 'meldio-client';
import Relay from 'react-relay';

const meldio = new Meldio(`http://localhost:9000`);
meldio.injectNetworkLayerInto(Relay);

export default meldio;
