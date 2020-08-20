export default {
  getInt (key: string) {
    const item = localStorage.getItem(key)
    if (item) {
      const int = parseInt(item, 10)
      if (!isNaN(int)) {
        return int
      }
    }
    return null
  },

  setItem (key: string, value: any) {
    localStorage.setItem(key, value)
  },
}
