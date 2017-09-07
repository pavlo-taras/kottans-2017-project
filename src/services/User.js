import api from '@/services/api'
export default {
  search (user) {
    return api().get(`/${user.name}`, user)
  }
}
