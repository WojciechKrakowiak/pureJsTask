import HomeController from 'controllers/home/HomeController';
import SuccessController from 'controllers/success/SuccessController';
import homeTemplate from 'templates/home/homeTemplate';
import successTemplate from 'templates/success/successTemplate';
import notFoundTemplate from 'templates/notFound/notFoundTemplate';
import router from 'router/router';
import 'style/style.scss';
import NotFoundController from 'controllers/notFound/NotFoundController';

router.add('/', homeTemplate, HomeController);
router.add('/success', successTemplate, SuccessController);
router.add('*', notFoundTemplate, NotFoundController);

window.addEventListener('hashchange', router.render);
window.addEventListener('load', router.render);
