var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('serve', ['connect:serve', 'watch']);

    grunt.registerTask('dev', [
        'clean',
        'ngTemplateCache',
        'less',
        'concat',
        'copy'
    ]);

    grunt.registerTask('default', [
        'dev',
        'uglify',
        'cssmin'
    ]);

    grunt.initConfig({
        cmpnt: grunt.file.readJSON('bower.json'),
        banner: '/*! comkerNgAuth v<%= cmpnt.version %> by Comker Team(comker@drupalex.net) - ' +
            'https://github.com/comker/comker-ng-auth - New BSD License */\n',
        clean: {
            working: {
                src: ['comker-ng-auth.*', './.temp/views', './.temp/']
            }
        },
        copy: {
            styles: {
                files: [
                    {
                        src: './src/styles/comker-ng-auth.less',
                        dest: './dist/comker-ng-auth.less'
                    }
                ]
            }
        },
        uglify: {
            js: {
                src: ['./dist/comker-ng-auth.js'],
                dest: './dist/comker-ng-auth.min.js',
                options: {
                    banner: '<%= banner %>',
                    sourceMap: function (fileName) {
                        return fileName.replace(/$/, '.map');
                    }
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    './dist/comker-ng-auth.min.css': './dist/comker-ng-auth.css'
                },
                options: {
                    banner: '<%= banner %>'
                }
            }
        },
        concat: {
            js: {
                src: [
                    'src/scripts/comker-ng-auth.js',
                    'src/scripts/comker-ng-auth-*.js',
                    './.temp/scripts/views.js'
                ],
                dest: './dist/comker-ng-auth.js'
            },
            css: {
                src: [
                    'src/styles/*.css',
                    './.temp/styles/less.css'
                ],
                dest: './dist/comker-ng-auth.css'
            }
        },
        less: {
            css: {
                files: {
                    './.temp/styles/less.css': 'src/styles/comker-ng-auth.less'
                }
            }
        },
        watch: {
            js: {
                files: 'src/scripts/*.js',
                tasks: ['concat:js'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: 'src/styles/*.less',
                tasks: ['less', 'concat:css'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/tmpl/*.html'],
                tasks: ['ngTemplateCache', 'concat:js'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 8800,
                hostname: 'localhost'
            },
            serve: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        ngTemplateCache: {
            views: {
                files: {
                    './.temp/scripts/views.js': ['src/tmpl/*.html']
                },
                options: {
                    trim: 'src/',
                    module: 'comkerNgAuth'
                }
            }
        }
    });
};
