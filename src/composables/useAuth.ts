import { ref } from "vue";

const username = ref<string | null>(null);

export function useAuth() {
  function setUser(name: string) {
    username.value = name;
  }

  function clearUser() {
    username.value = null;
  }

  return {
    username,
    setUser,
    clearUser,
  };
}
