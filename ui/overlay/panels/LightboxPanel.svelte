<script lang="ts">
    import { Transition } from "svelte-transition";
    import type { Overlay } from "../overlay";
    import { clickOutside } from '../actions/events';


    export let overlay:Overlay;

</script>




<Transition
    show={ $overlay.opened }
    appear={true}
    enter="transition ease-in duration-200"
    enterTo="opacity-100 "
	enterFrom="opacity-0"
>
    <div class="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div use:clickOutside={overlay.close} >
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</Transition>

