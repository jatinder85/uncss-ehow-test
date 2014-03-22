/*global module:false*/

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: 'package.json',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    uglify: {
      prod: {
        files: {
          '../dist/main.min.js': ['../dist/main.js']
        }
      }
    },
    concat: {
      options: {
        banner: '(function(){',
        footer: '})();'
      },
      prod: {
        src: ['../src/namespace.js', '../src/Url.js', '../src/Dom.js', '../src/overrides.js', '../src/Component.js', '../src/main.js'],
        dest: '../dist/main.js'
      }
    },
    watch: {
      files: ['../src/**/*'],
      tasks: 'build'
    },
    jshint: {
      files: ['gruntfile.js', '../src/**/*.js'],
      options: {
        curly: true,
        immed: false,
        eqeqeq: true,
        forin: true,
        latedef: true,
        newcap: true,
        noarg: true,
        unused: false,
        undef: true,
        strict: false,
        sub: true,
        boss: true,
        evil: true,
        eqnull: true,
        browser: true,
        node: true,
        jquery: true,
        smarttabs: true,
        globals: {
          jQueryIC: true,
          DMDRMA: true,
          product: true,
          RMA_tools: true
        }
      }

    },
    less: {
      dev: {
        options: {
          cleancss: true
        },
        files: {
          "../../css/buttons.css": "../../less/buttons.less"
        }
      }
    },
    ucss: {
      target: {
        options: {
          whitelist: ['.some-ok-selector'],
          auth: null
        },
        pages: {
          crawl: 'http://intellij.dev/dev-experimental/ucss-test/main.html',
          //include: ['http://localhost/extra-not-reachable-by-crawl']
        },
        css: ['common_header.css']
      }
    },
    uncss: {
      options: {
        ignore: ['#primaryNav .subChannel.active', '.subChannel .dropdown .groupNamesBg']
      },
      dist: {
        files: {
          'dist/common_header.css': ['main.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ucss');

  grunt.loadNpmTasks('grunt-uncss');

  /*  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-less');
*/
  //Prod Task
  grunt.registerTask('build', ['jshint', 'concat:prod', 'uglify:prod', 'less:dev']);

};