<template>
    <div class="public-width">
        <div class="term">
            <div class="term-header">
                <span>术语解释</span>
                <Input search enter-button placeholder="Enter something..." class="term-seach"/>
            </div>
            <table class="term-table">
                <tr>
                    <th>术语名称</th>
                    <th>解释</th>
                    <th></th>
                </tr>
                <tr>
                    <td>(Q)SAR and SAR(Q)SAR and SAR</td>
                    <td><span>    In the context of this guideline, refers to the relationship between the molecular (sub) structure of a compound and its        mutagenic activity using (Quantitative) Structure-Activity Relationships derived from experimental data.</span>
                    </td>
                    <td>
                        <button class="term-btn">中文</button>
                    </td>
                </tr>
                <tr>
                    <td>3T3 NRU-PT</td>
                    <td><span>    In the context of this guideline, refers to the relationship between the molecular (sub) structure of a compound and its        mutagenic activity using (Quantitative) Structure-Activity Relationships derived from experimental data.</span>
                    </td>
                    <td>
                        <button class="term-btn">中文</button>
                    </td>
                </tr>
                <tr>
                    <td>Abuse</td>
                    <td><span>    In the context of this guideline, refers to the relationship between the molecular (sub) structure of a compound and its        mutagenic activity using (Quantitative) Structure-Activity Relationships derived from experimental data.</span>
                    </td>
                    <td>
                        <button class="term-btn">中文</button>
                    </td>
                </tr>
                <tr>
                    <td>Accelerated testing</td>
                    <td><span>    In the context of this guideline, refers to the relationship between the molecular (sub) structure of a compound and its        mutagenic activity using (Quantitative) Structure-Activity Relationships derived from experimental data.</span>
                    </td>
                    <td>
                        <button class="term-btn">中文</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "term"
    }
</script>

<style scoped>
    .term {
        width: 1000px;
        margin: 0 auto;
    }

    .term-header {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .term-seach {
        display: inline-table;
        margin-left: 2rem;
        width: 25rem;
    }

    .term-table {
        margin-top: 1rem;
        width: 100%;
        border-collapse: collapse;
    }

    .term-table > tr > td,
    .term-table > tr > th {
        border: 1px solid #ddd;
        padding: .6rem .6rem;
        height: 2.6rem;
    }

    .term-table > tr > td img {
        width: 1rem;
        height: 1rem;
        padding-top: .2rem;
    }

    .term-table > tr > td:first-child,
    .term-table > tr > td:last-child {
        min-width: 8rem;
        padding: .6rem .5rem;
        font-size: 1rem;
        font-weight: 600;
    }

    .term-table > tr > td:last-child {
        text-align: center;
    }

    .term-btn {
        padding: .2rem 2rem;
        background-color: transparent;
        color: #999;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
