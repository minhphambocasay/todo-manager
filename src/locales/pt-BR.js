import analysis from './fr-FR/analysis';
import exception from './fr-FR/exception';
import form from './fr-FR/form';
import globalHeader from './fr-FR/globalHeader';
import login from './fr-FR/login';
import menu from './fr-FR/menu';
import monitor from './fr-FR/monitor';
import result from './fr-FR/result';
import settingDrawer from './fr-FR/settingDrawer';
import settings from './fr-FR/settings';
import pwa from './fr-FR/pwa';
import component from './fr-FR/component';
import editor from './fr-FR/editor';

export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.home.introduce': 'introduzir',
  'app.forms.basic.title': 'Basic form',
  'app.forms.basic.description':
    'Páginas de formulário são usadas para coletar e verificar as informações dos usuários e formulários básicos são comuns nos cenários onde existem alguns formatos de informações.',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...editor,
};
