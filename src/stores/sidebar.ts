import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isCollapsed: false,
    isMobile: false,
  }),
  actions: {
    toggle() {
      this.isCollapsed = !this.isCollapsed;
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) this.isCollapsed = true;
    },
  },
});
