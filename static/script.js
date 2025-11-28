const searchMovies = async() => {
            const searchInput = document.getElementById('searchInput').value;
            const resultsGrid = document.getElementById('resultsGrid');

            if (!searchInput.trim()) {
                resultsGrid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🍿</div>
                        <p>Search for a movie to get started</p>
                    </div>
                `;
                return;
            }

            const response = await fetch("/recommend",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    searchInput
                })
            })
            const results = await response.json()
            console.log(response)
            if (response.status == 404) {
                resultsGrid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <p>No movies found matching "${searchInput}"</p>
                    </div>
                `;
                return;
            }
            console.log(results.data)
            resultsGrid.innerHTML = results.data.map(movie => `
                <div class="movie-card">
                    <div class="movie-title-section">
                        <h2 class="movie-title">${movie.title}</h2>
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-info-title">${movie.title}</h3>
                        
                        <div class="info-section">
                            <div class="info-label">Genre</div>
                            <div class="info-content">
                                ${movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                            </div>
                        </div>
                        <div class="info-section">
                            <div class="info-label">Director</div>
                            <div class="info-content">
                                ${movie.crew.map(crew => `<span class="actor-pill">${crew}</span>`).join('')}
                            </div>
                        </div>

                        <div class="info-section">
                            <div class="info-label">Top Cast</div>
                            <div class="info-content">
                                ${movie.cast.map(actor => `<span class="actor-pill">${actor}</span>`).join('')}
                            </div>
                        </div>

                        <div class="info-section">
                            <div class="info-label">Overview</div>
                            <div class="info-content">${movie.overview}</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Allow search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchMovies();
        });