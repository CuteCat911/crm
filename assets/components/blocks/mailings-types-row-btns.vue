<template>
    <row-btns :box="true">
        <button class="row-btn btn btn--empty"></button>
        <row-btn title="Создать новый тип"
                 :link="{name: 'newMailing'}"
        ></row-btn>
        <row-btn title="Удалить"></row-btn>
        <row-btn title="Редактировать"></row-btn>
    </row-btns>
</template>

<script>

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";

    export default {
        name: "mailings-types-row-btns",
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>