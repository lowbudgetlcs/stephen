import { ref } from "vue";

const username = ref<string | null>(sessionStorage.getItem("username"));

export function useAuth() {
  function setUser(name: string) {
    username.value = name;
    sessionStorage.setItem("username", name);
  }

  function clearUser() {
    username.value = null;
    sessionStorage.removeItem("username");
  }

  return { username, setUser, clearUser };
}
