var dataPoints = [
      { label: "Openstack", y: 0 },
      { label: "AWS", y: 0 },
      { label: "Azure", y: 0 },
      { label: "GCP", y: 0 },
    ]

    var chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme2",
        data: [
          {
            type: "column",
            dataPoints: dataPoints
          }
        ]
      });

      chart.render();
    }

    Pusher.logToConsole = true;

    // Configure Pusher instance
    const pusher = new Pusher('502a706dcc8b4bd7873c', {
      cluster: 'eu',
      encrypted: true
    });

    // Subscribe to poll trigger
    var channel = pusher.subscribe('poll');

    // Listen to vote event
    channel.bind('vote', function(data) {
      dataPoints = dataPoints.map(dataPoint => {
        if(dataPoint.label == data[4].name[0]) {
          dataPoint.y += 10;
        }

        return dataPoint
      });

      // Re-render chart
      chart.render()
    });
