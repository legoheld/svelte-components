<script lang="ts">
    export let name;
</script>

<svg class={$$props.class}>
  <use xlink:href="#{name}" />
</svg>