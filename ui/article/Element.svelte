<script lang="ts">
    import { flip } from 'svelte/animate';
</script>

<div class="article-element">
    <div class="flex flex-row">
        <slot name="handles">
            <div class="">Handles</div> 
        </slot>
        <div class="flex-1 relative">
            <slot name="toolbar">
                <div>Toolbar</div>
            </slot>
            <slot name="content">
                <div>Content</div>
            </slot>

        </div>
    </div>
</div>