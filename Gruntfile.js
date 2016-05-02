module.exports = function (grunt) {
  const target = '<%= project.target %>',
    packageTarget = '<%= pkg.name %>.zip',
    sourceFiles = '<%= project.src %>/**/*.js',
    targetFolder = '<%= project.target %>';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      root: 'src',
      target: 'target',
      src: '<%= project.root %>/scripts',
      bundle: '<%= project.target %>/scripts/module.js',
      views: '<%= project.root %>/views',
      images: '<%= project.root %>/images',
      libs: '<%= project.root %>/lib',
      css: '<%= project.root %>/styles'
    },
    compress: {
      main: {
        options: {
          archive: packageTarget
        },
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['**/*'], dest: targetFolder }
        ]
      }
    },
    copy: {
      img: {
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['images/**/*'], dest: targetFolder }
        ]
      },
      css: {
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['styles/**/*'], dest: targetFolder }
        ]
      },
      views: {
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['views/**/*'], dest: targetFolder }
        ]
      },
      manifest: {
        files: [{
          expand: true,
          cwd: '<%= project.root %>',
          src: ['*.json'],
          dest: '<%= project.target %>'
        }]
      }
    },
    jsbeautifier: {
      files: ['<%= project.root %>/**/*'],
      options: {
        config: '.jsbeautifyrc'
      }
    },
    browserify: {
      dist: {
        files: {
          '<%= project.bundle %>': [sourceFiles]
        }
      }
    },
    eslint: {
      app: [sourceFiles]
    },
    clean: {
      zip: {
        src: [packageTarget]
      },
      target: {
        src: [target]
      }
    },
    watch: {
      src: {
        files: ['<%= project.root %>/**/*'],
        tasks: ['development'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jsbeautifier', 'eslint', 'clean', 'browserify', 'copy']);
  grunt.registerTask('development', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build', ['default', 'compress']);
};

