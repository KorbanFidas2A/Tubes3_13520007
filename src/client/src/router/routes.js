import Beranda from '../pages/Beranda'
import Penyakit from '../pages/Penyakit'
import Prediksi from '../pages/Prediksi'
import Riwayat from '../pages/Riwayat'
import Tentang from '../pages/Tentang'

export const AllRoutes = [
    {
        label: 'Beranda',
        path: '/',
        component: Beranda,
    }, {
        label: 'Penyakit',
        path: '/Penyakit',
        component: Penyakit,
    }, {
        label: 'Prediksi',
        path: '/Prediksi',
        component: Prediksi,
    }, {
        label: 'Riwayat',
        path: '/Riwayat',
        component: Riwayat,
    }, {
        label: 'Tentang',
        path: '/Tentang',
        component: Tentang,
    }
]

