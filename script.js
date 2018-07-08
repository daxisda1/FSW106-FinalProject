$(function($) {

    $.getJSON('./resume.json', function(resume) {
        $("#name").html(resume.basics.name);
        $("#label").html(resume.basics.label);
        
        const { address, postalCode, city, countryCode, region } = resume.basics.location
        $("address").html(`${address}, ${city}, ${region} ${postalCode}, ${countryCode}`);
        
        $("#summary").html(resume.basics.summary);
        
        const socialIcon = (network) => {

            if( network === 'facebook' ) {
                return '<i class="fab fa-facebook-f"></i>';
            }else if( network === 'instagram') {
                return '<i class="fab fa-instagram"></i>'
            }else{
                return '<i class="fas fa-link"></i>'
            }

        }
        let socialsIcons = '';
        $.each(resume.basics.profiles, function(i, network) {
            socialsIcons += `<li><a href="${network.url}">${socialIcon(network.network)}</a></li>`;
        });
        $("#socials").html(socialsIcons);


        // Skills
        let skills = '<div>';
        skills += '<h2><span>Skills</span></h2>';
        skills += '<ul>';
        $.each(resume.skills, function(i, skill) {

            let keywords = '';
            $.each(skill.keywords, function(i, keyword) {
                keywords += `<span class="badge badge-primary mr-2">${keyword}</span>`
            });

            skills += `<li>
                <h3>${skill.name}</h3>
                <p>${skill.level}</p>
                <div>${keywords}</div>
            </li>`;
        });
        skills += '</ul>';
        skills += '</div>';
        $("#skills").html(skills);

        // Work
        let works = '<div>';
        works += `<h2><span>Work Experience (${resume.work.length})</span></h2>`;
        works += '<ul>';
        $.each(resume.work, function(i, work) {

            let highlights = '';
            $.each(work.highlights, function(i, highlight) {
                highlights += `<li>${highlight}</li>`
            });

            works += `<li>
                <h3><stron>${work.position}</stron> at ${work.company} <time>${work.startDate} - ${work.endDate}</time></h3>
                <p>${work.summary}</p>
                <ul>${highlights}</ul>
            </li>`;
        });
        works += '</ul>';
        works += '</div>';
        $("#works").html(works);

        // Educations
        let educations = '<div>';
        educations += `<h2><span>Educations (${resume.education.length})</span></h2>`;
        educations += '<ul>';
        $.each(resume.education, function(i, education) {

            let courses = '';
            $.each(education.courses, function(i, course) {
                courses += `<span class="badge badge-primary mr-2">${course}</span>`
            });


            educations += `<li>
                <h3><stron>${education.studyType} ${education.area}</stron> at ${education.institution}</h3>
                <p><strong>${education.startDate} - ${education.endDate}</strong></p>
                <div>${courses}</div>
                <div><strong>Grade: </strong>${education.gpa}</div>
            </li>`;
        });
        educations += '</ul>';
        educations += '</div>';
        $("#educations").html(educations);


        
    });

    $.getJSON('https://api.github.com/users/daxisda1/repos', function(repos) {

    let reposOutput = '<div class="row">';
        $.each(repos, function(i, repo) {
            reposOutput += `
            <div class="col-md-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description ? repo.description : ''}</p>
                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary">See repo</a>
                    </div>
                </div>
            </div>
            `
        })
        reposOutput += '</div>';
        $('#repos').html(reposOutput)
    })
})