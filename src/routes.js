import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import ExcelView from './components/views/Excel.vue'
import ChartView from './components/views/Chart.vue'
import DataDasarView from './components/views/DataDasar.vue'
import KategoriView from './components/views/Kategori.vue'
import UnitView from './components/views/Unit.vue'
import CapaianUnitView from './components/views/CapaianUnit.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'excel',
        component: ExcelView,
        name: 'Excel',
        meta: {description: 'Simple and advance table in CoPilot but with jexcels'}
      }, {
        path: 'datadasar',
        component: DataDasarView,
        name: 'DataDasar',
        meta: {description: 'Tabel DataDasar dalam Jexcel'}
      }, {
        path: 'kategori',
        component: KategoriView,
        name: 'Kategori',
        meta: {description: 'Tabel Kategori dalam Jexcel'}
      }, {
        path: 'unit',
        component: UnitView,
        name: 'Unit',
        meta: {description: 'Tabel Unit dalam Jexcel'}
      }, {
        path: 'capaianunit',
        component: CapaianUnitView,
        name: 'CapaianUnit',
        meta: {description: 'Tabel CapaianUnit dalam Jexcel'}
      }, {
        path: 'chart',
        component: ChartView,
        name: 'Chart',
        meta: {description: 'ChartJS'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
