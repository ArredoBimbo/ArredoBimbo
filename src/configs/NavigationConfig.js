import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  FileImageOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


const appsNavTree = [{
  key: 'apps',
  path: `${APP_PREFIX_PATH}/apps`,
  title: 'sidenav.apps',
  icon: AppstoreOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'home',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'home',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'apps-ecommerce-orders',
      path: `${APP_PREFIX_PATH}/ordini`,
      title: 'sidenav.apps.orders',
      icon: FundOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'apps-ecommerce-handle-photos',
      path: `${APP_PREFIX_PATH}/gestione-foto`,
      title: 'sidenav.apps.photos',
      icon: FileImageOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'apps-ecommerce',
      path: `${APP_PREFIX_PATH}/ecommerce`,
      title: 'sidenav.apps.ecommerce',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'apps-ecommerce-productList',
          path: `${APP_PREFIX_PATH}/ecommerce/lista-prodotti`,
          title: 'sidenav.apps.ecommerce.productList',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apps-ecommerce-addProduct',
          path: `${APP_PREFIX_PATH}/ecommerce/aggiungi-prodotto`,
          title: 'sidenav.apps.ecommerce.addProduct',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    }
  ]
}]

const navigationConfig = [
  ...appsNavTree
]

export default navigationConfig;
