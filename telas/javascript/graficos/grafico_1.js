am5.ready(function() {
    // Criação dos root containers para os gráficos
    var root1 = am5.Root.new("chartdiv1");
    var root2 = am5.Root.new("chartdiv2");
    var root3 = am5.Root.new("chartdiv3");
    var root4 = am5.Root.new("chartdiv4");

    // Remove o logotipo padrão dos gráficos
    root1._logo.dispose();
    root2._logo.dispose();
    root3._logo.dispose();
    root4._logo.dispose();

    // Define as paletas de cores para cada tema
    var colorPalettes = {
        agua: {
            "agua": am5.color(0x0044CC),
            "media_gasto_agua": am5.color(0x0033A0),
            "media_de_uso": am5.color(0x0066FF),
            "total_agua_reutilizado": am5.color(0x0099FF),
        },
        luz: {
            "luz": am5.color(0xF9E79F),
            "intensidade_luz": am5.color(0xF7DC6F),
            "tempo_luz": am5.color(0xF5B041),
            "consumo_luz": am5.color(0xF39C12),
        },
        safra: {
            "safra": am5.color(0xFFBF00),
            "colheita": am5.color(0xF7DC6F),
            "produtos": am5.color(0xF4A460),
            "estoque": am5.color(0xD35400),
        },
        praga: {
            "praga_grave": am5.color(0xB71C1C),
            "infestacao": am5.color(0xD32F2F),
            "sinais_alerta": am5.color(0xFFEB3B),
            "tratamento": am5.color(0x4CAF50),
        }
    };

    // Função para criar gráficos
    function createChart(root) {
        return root.container.children.push(am5percent.PieChart.new(root, {
            startAngle: 180,
            endAngle: 360,
            layout: root.verticalLayout,
            innerRadius: am5.percent(50)
        }));
    }

    // Criação dos gráficos
    var chart1 = createChart(root1);
    var chart2 = createChart(root2);
    var chart3 = createChart(root3);
    var chart4 = createChart(root4);

    // Função para criar as séries dos gráficos
    function createSeries(chart) {
        return chart.series.push(am5percent.PieSeries.new(chart.root, {
            startAngle: 180,
            endAngle: 360,
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        }));
    }

    // Criação das séries para cada gráfico
    var series1 = createSeries(chart1);
    var series2 = createSeries(chart2);
    var series3 = createSeries(chart3);
    var series4 = createSeries(chart4);

    // Função para atualizar os dados dos gráficos
    function updateChartData(type, series) {
        var data;
        switch (type) {
            case 'agua':
                data = [
                    { value: 10, category: "agua" },
                    { value: 20, category: "media_gasto_agua" },
                    { value: 30, category: "media_de_uso" },
                    { value: 15, category: "total_agua_reutilizado" },
                ];
                break;
            case 'luz':
                data = [
                    { value: 15, category: "luz" },
                    { value: 25, category: "intensidade_luz" },
                    { value: 35, category: "tempo_luz" },
                    { value: 25, category: "consumo_luz" }
                ];
                break;
            case 'safra':
                data = [
                    { value: 5, category: "safra" },
                    { value: 40, category: "colheita" },
                    { value: 50, category: "produtos" },
                    { value: 25, category: "estoque" },
                ];
                break;
            case 'praga':
                data = [
                    { value: 20, category: "praga_grave" },
                    { value: 30, category: "infestacao" },
                    { value: 50, category: "sinais_alerta" },
                    { value: 25, category: "tratamento" },
                ];
                break;
        }
        series.data.setAll(data);
    }

    // Função para aplicar as cores dos temas
    function applyThemeColors(series, theme) {
        var colors = colorPalettes[theme];
        series.slices.template.adapters.add("fill", function(fill, target) {
            return colors[target.dataItem.dataContext.category] || fill;
        });
    }

    // Função para exibir o gráfico selecionado
    function showChart(chartId, theme) {
        var charts = document.querySelectorAll('.chart');
        charts.forEach(chart => {
            if (chart.id === chartId) {
                chart.style.opacity = 1;
                chart.style.transform = 'translateX(0)';
                chart.style.animation = 'slideIn 0.5s forwards';
            } else {
                chart.style.opacity = 0;
                chart.style.transform = 'translateX(-100%)';
                chart.style.animation = 'slideOut 0.5s forwards';
            }
        });

        // Atualiza os dados e as cores do gráfico selecionado
        if (chartId === 'chartdiv1') {
            updateChartData(theme, series1);
            applyThemeColors(series1, theme);
        } else if (chartId === 'chartdiv2') {
            updateChartData(theme, series2);
            applyThemeColors(series2, theme);
        } else if (chartId === 'chartdiv3') {
            updateChartData(theme, series3);
            applyThemeColors(series3, theme);
        } else if (chartId === 'chartdiv4') {
            updateChartData(theme, series4);
            applyThemeColors(series4, theme);
        }
    }

    // Inicializa com o gráfico de "água"
    showChart('chartdiv2', 'luz');

    // Adiciona eventos aos botões para mudar o gráfico conforme o clique
    document.querySelector(".botao-monitoramento[data-type='agua']").addEventListener('click', function() {
        showChart('chartdiv1', 'agua');
    });

    document.querySelector(".botao-monitoramento[data-type='luz']").addEventListener('click', function() {
        showChart('chartdiv2', 'luz');
    });

    document.querySelector(".botao-monitoramento[data-type='safra']").addEventListener('click', function() {
        showChart('chartdiv3', 'safra');
    });

    document.querySelector(".botao-monitoramento[data-type='praga']").addEventListener('click', function() {
        showChart('chartdiv4', 'praga');
    });

    // Inicializa os gráficos com os dados apropriados
    updateChartData('agua', series1);
    applyThemeColors(series1, 'agua');
    series1.labels.template.set("visible", false); // Desabilitar rótulos
    series1.ticks.template.set("visible", false);  // Desabilitar ticks

    updateChartData('luz', series2);
    applyThemeColors(series2, 'luz');
    series2.labels.template.set("visible", false); // Desabilitar rótulos
    series2.ticks.template.set("visible", false);  // Desabilitar ticks

    updateChartData('safra', series3);
    applyThemeColors(series3, 'safra');
    series3.labels.template.set("visible", false); // Desabilitar rótulos
    series3.ticks.template.set("visible", false);  // Desabilitar ticks

    updateChartData('praga', series4);
    applyThemeColors(series4, 'praga');
    series4.labels.template.set("visible", false); // Desabilitar rótulos
    series4.ticks.template.set("visible", false);  // Desabilitar ticks
});
