import api from '@/services/api'
export default {
  search (name) {
    // https://api.github.com/repos/Kottans/kottans-calendar    parent
    return api().get(`/${name}`, name)
  }
}
