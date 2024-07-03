declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    KButton: typeof import("kome-ui")["SButton"];
  }
  interface ComponentCustomProperties {
    $message: typeof import("kome-ui")["message"];
  }
}
