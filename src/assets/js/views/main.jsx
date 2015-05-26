var React = require('react/addons');

var MainView = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      lipsum: [
        "Lorem ipsum dolor sit amet, ad offendit hendrerit cum, vel modo tale eripuit ut. Solet feugait commune an eum, probo ponderum ex mea. Usu adversarium repudiandae delicatissimi ei, no deleniti efficiendi eum. Pro dico semper ut.",
        "Pri ne modo omittantur, mel nullam corpora forensibus ex, mel an deseruisse cotidieque reprehendunt. In stet nibh rationibus pri, ad justo vulputate forensibus vim. Vis ea putent virtute. Eu duis melius usu. Sed probo saepe in, vel at esse similique.",
        "Vis ex congue aperiam, sed ne clita corrumpit theophrastus, an duo veri temporibus. At aperiri patrioque reformidans sed, sea lorem persecuti ut. Eos tota partem noluisse an, graece iriure dissentiunt ius ex. Justo facete contentiones an sea.",
        "Ut pri putent tacimates. Usu salutandi consequuntur cu, in est choro percipitur. Ea erat ridens has, eam accusata persequeris in. An est offendit urbanitas incorrupte, ut vel rebum albucius pertinax, dictas indoctum usu an. Illum euismod torquatos eos eu.",
        "Movet feugait dignissim at per. Etiam eruditi cum te. Purto oratio possim ea vel. Cu decore inermis instructior ius, no eum veri delicata, commodo pericula laboramus ad sed. Ne alia commodo volutpat vim. In postea lucilius eum, ut est tantas consequat prodesset. Te meliore theophrastus duo.",
        "Vel te zril nostro eirmod. Te mel etiam corrumpit. Eu sea feugait explicari molestiae, eam ocurreret accusamus cu, unum veri blandit qui ex. Ignota facilisis iudicabit vel ad, quis iracundia mea an, nostrud delicata an sed.",
        "Vim in idque soluta, mandamus vulputate ei eam, purto copiosae qui at. Eos alia dicunt tibique te, alii sensibus ei sea. Facer meliore argumentum usu et, ex fuisset corrumpit est, eum ne solet tritani. Eam cu nonumy scaevola.",
        "Cu est voluptatum scribentur. Sed civibus pericula ex. An rebum definiebas vim, eam ne ferri sapientem. Ne agam solum per. Ea unum fastidii mea, wisi inermis ne per.",
        "Sanctus noluisse mnesarchum at eos. Eu eam stet suscipit persequeris. Nam indoctum iracundia eu. Dolor tollit has in, mel mutat iracundia gubergren at. Pri option offendit theophrastus no, eum dicat quidam delectus ne. Suscipit deserunt consulatu vel et, mei dicunt explicari mnesarchum in.",
        "Mutat cetero pertinacia cum no, vel ea sadipscing disputando omittantur. Soluta viderer pri te, ius in clita perfecto instructior, et mediocrem partiendo cotidieque vim. Sea in dolorem sapientem suscipiantur. Nec in periculis disputando dissentiet. Possit facilisi vix no."
      ],
      loaded: 0
    }
  },
  componentDidMount: function() {
    this.setState({loading: true});
    this.loadLipsum();
  },
  loadLipsum: function() {
    if (!this.isMounted()) {
      return;
    }
    var loaded = this.state.loaded + 1;
    if (loaded <= this.state.lipsum.length - 1) {
      this.setState({loaded: loaded});
      setTimeout(this.loadLipsum, 500 + Math.random() * 1000);
    }
    else {
      this.setState({loading: false});
    }
  },
  render: function () {
    return (
      <ul className={this.state.loading ? 'loading-container' : ''}>
        {this.state.lipsum.map(this.renderLipsum)}
      </ul>
    );
  },
  renderLipsum: function(lipsumItem, itemNumber) {
    if (itemNumber > this.state.loaded) {
      return null;
    }
    else {
      return <li key={itemNumber}>{lipsumItem}</li>;
    }
  }
});

module.exports = MainView;