import api from '@/services/api'
export default {
  index (name) {
    return api().get(`/${name}/repos`)
  }
}
