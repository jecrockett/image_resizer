import React from 'react';
import { render } from 'react-dom';
import Application from './components/application';

import resizer from './resizer';

render(<Application />, document.querySelector('.application'));
